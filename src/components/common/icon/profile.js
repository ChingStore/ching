// @flow

import React from 'react'
import STYLE from 'constants/style'

type PropsType = {
  fill: typeof STYLE.COLOR,
}

const ProfileIcon = ({ fill }: PropsType) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.5 16C8.32843 16 9 15.3284 9 14.5C9 13.6716 8.32843 13 7.5 13C6.67157 13 6 13.6716 6 14.5C6 15.3284 6.67157 16 7.5 16Z" />
    <path d="M16.5 16C17.3284 16 18 15.3284 18 14.5C18 13.6716 17.3284 13 16.5 13C15.6716 13 15 13.6716 15 14.5C15 15.3284 15.6716 16 16.5 16Z" />
    <path d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM12 22C6.486 22 2 17.514 2 12C2.031 11 4.544 9.951 6.855 9.951C6.876 9.951 6.896 9.951 6.917 9.951C9.442 9.949 12.558 9.955 15.796 7.472C18.375 10.946 22 12 22 12C22 17.514 17.514 22 12 22Z" />
  </svg>
)

export default ProfileIcon
