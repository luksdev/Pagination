import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getPosts from '../src/services/posts'
import Pagination from '../src/components/Pagination'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

type Post = {
  id: number,
  title: string,
  body: string,
  userId: number,
}

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  // Takes 100 API posts
  useEffect(() => {
    getPosts().then(posts => setPosts(posts))
  }, [])

  const handleNextPage = () => {
    if(currentPage < 20){ 
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {  
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pagination</title>
        <meta name="Created pagination to Testing for RogaLabs" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pagination - Roga
        </h1>

        <div style={{display: "flex"}}>
          <button onClick={handlePreviousPage}><AiOutlineArrowLeft/></button>
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage}/>
          <button onClick={handleNextPage}><AiOutlineArrowRight/></button>
        </div>

        {currentPosts.map((post:  Post) => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postId}>ID: {post.id}</p>
            <p className={styles.postBody}>{post.body}</p>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <p className={styles.description}>
          Created by{' '}
          <a href="https://github.com/luksdev">
            <code className={styles.code}>Lucas Eduardo</code>
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Home
