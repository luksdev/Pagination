import React from 'react'
import style from '../../styles/Home.module.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

type Props = {
  postsPerPage: number,
  totalPosts: number,
  paginate: Function,
  currentPage: number
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }: Props) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination" style={{padding: 0, display: 'flex', listStyle: "none", alignItems: 'center', justifyContent: 'center' }}>
        {pageNumbers.map(number => (
          <li key={number} className="page-item" >
            <a onClick={() => paginate(number)} className={style.pageLink} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination