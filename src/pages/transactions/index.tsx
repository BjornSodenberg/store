import { User } from "components/update-user/types";
import NavigationWrapper from "components/wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateEmployer } from "store/users/reducers";
import { AnalyticsSender } from "utils/analytics";
import { writeToHistory } from "utils/firebase";
import cx from "classnames";
import Transactions from "utils/transactions";

import "./styles.css";

type Doc = {
    id: string;
    email: string;
    date: string;
    count: string;
    status: string;
    items: string;
};

type Transaction = {
    id: string;
    doc: Doc;
};

export const TransactionsPage = () => {
    const transactionService = new Transactions();
    const [transactions, setTransactions] = useState<Transaction[]>();
    const employees = useSelector((state: RootState) => state.employees);
    const admin = useSelector((state: RootState) => state.admin);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const analyticsSender = new AnalyticsSender();

    useEffect(() => {
        async function getTransactions() {
            let response;
            try {
                response = await transactionService.getTransactions();
                let docs: Transaction[] = [];
                response.forEach((doc) => {
                    docs.push({ id: doc.id, doc: doc.data() as Doc });
                });
                setTransactions(docs);
            } catch (e) {
                console.log(e);
            }
        }
        setUpdate(false);
        getTransactions();
    }, [update]);

    const acceptTransaction = ({
        userWallet,
        orderAmount,
        user,
        transactionId,
    }: {
        userWallet: number;
        orderAmount: number;
        user: User;
        transactionId: string;
    }) => {
        console.log("accepted transaction");

        const newValue = userWallet - orderAmount;

        let upd = { ...user, lemons: newValue };
        dispatch(updateEmployer(upd));
        writeToHistory(
            "-" + orderAmount,
            admin.email,
            user.email,
            "decrease",
            "lemons",
            "Подтверждение транзакции"
        );

        analyticsSender.sendSpendingLemons(orderAmount);
        analyticsSender.sendAcceptTransaction();

        transactionService.changeStatusTransaction(transactionId);
        setUpdate(true);
    };

    const regjectTransaction = (id: string) => {
        console.log("rejected transaction");
        setUpdate(true);
        transactionService.changeStatusTransaction(id);
        analyticsSender.sendRejectTransaction();
    };

    const getUser = (email: string): User => {
        const result = Array.prototype.filter.call(
            Object.values(employees.entities),
            (item) => item.email === email
        );

        return result[0];
    };

    const TransactionItem = ({ item }: { item: Transaction }) => {
        const orderAmount = item.doc.count.split(",").reduce((acc, curr) => {
            return Number(acc) + Number(curr);
        }, 0);

        const userWallet = getUser(item.doc.email).lemons;

        const inaccessibilityAcceptance = userWallet < orderAmount;

        const data = {
            userWallet,
            orderAmount,
            user: getUser(item.doc.email),
            transactionId: item.id,
        };

        return (
            <div className="transactions__list-item">
                <div className="transactions__list-item-info">
                    <span>{item.doc.email}</span> хочет списать{" "}
                    <span>{orderAmount}</span> лимонов
                    <span>, eсть у пользователя {userWallet}</span>
                    <ul className="transactions__items">
                        {item.doc.items &&
                            item.doc.items
                                .replaceAll("&quot;", "")
                                .split(";")
                                .map((el) => <li>{el}</li>)}
                    </ul>
                </div>
                <div className="transacions__list-item-buttons-container">
                    <button
                        className={cx(
                            "transactions__list-item-button",
                            "accept",
                            { disable: inaccessibilityAcceptance }
                        )}
                        disabled={inaccessibilityAcceptance}
                        onClick={() => acceptTransaction(data)}
                    >
                        Подтвердить
                    </button>
                    <div
                        className="transactions__list-item-button reject"
                        onClick={() => regjectTransaction(item.id)}
                    >
                        Отказать
                    </div>
                </div>
            </div>
        );
    };

    return (
        <NavigationWrapper path="transactions">
            <div className="transactions__main">
                <h2 className="transactions__title">Транзакции</h2>
                <div className="transactions__list-container">
                    {transactions && transactions.length > 0 ? (
                        transactions?.map(
                            (item) =>
                                item.id &&
                                item.doc.email && (
                                    <TransactionItem
                                        item={item}
                                        key={item.id}
                                    />
                                )
                        )
                    ) : (
                        <div className="transactions__list-item">
                            <div className="transactions__list-item-info">
                                <span>Заявок на снятие лимонов еще нет</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </NavigationWrapper>
    );
};
