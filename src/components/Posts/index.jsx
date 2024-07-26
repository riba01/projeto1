import { PostCard } from "../PostCard";
import './styles.css';

export const Posts = ({ posts }) => (
    <div className='posts'>
        {posts.map((item) => (
            <PostCard
                key={item.id}
                title={item.title}
                body={item.body}
                id={item.id}
                cover={item.cover}
            />
        ))}
    </div>
)