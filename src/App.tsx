import UpdateUserForm from './components/update-user';
import PostForm from './components/post-new-user';

function App() {

    return (
        <div className=''>
            <h1
                className='text-3xl font-bold underline'
            >Hello</h1>
            <div className='flex-none'>
                <UpdateUserForm />
            </div>
            <div className='flex-1'>
                <PostForm />
            </div>
        </div>
    );
}

export default App;
