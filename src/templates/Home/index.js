import { Component } from 'react';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Input';
import { Posts } from '../../components/Posts';
import { loadPost } from '../../utils/load-posts';
import './styles.css';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPost();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }
  loadMorePosts = () => {
    /* console.log("Clicado") */

    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage })
    /* console.log(page, postsPerPage, nextPage, nextPage + postsPerPage) */
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ ...this.state, searchValue: value });
  }
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;


    return (
      <section className='container'>
        {
          !!searchValue && (
            <>
              <h1>Search Value: {searchValue}</h1>
            </>
          )

        }
        <div className='input-container'>
          <TextInput inputValue={searchValue} actionFn={this.handleChange} placeholder='Search' />
        </div>
        {
          filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
          )
        }
        {
          filteredPosts.length === 0 && (
            <p>Não existem posts para o nome pesquisado...</p>
          )
        }

        <div className='button-container'>
          {
            !searchValue && (
              <>
                <Button
                  text="Load More Posts"
                  onClick={this.loadMorePosts}
                  disabled={noMorePosts}
                />
              </>
            )

          }

        </div>

      </section>

    )
  }
}

export default Home;
