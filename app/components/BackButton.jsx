'use client'
import React from 'react'
import { useRouter } from "../../routing"
import { ArrowBackIosNew } from '@mui/icons-material'

function BackButton({className}) {
    const router = useRouter();
  return (
    <div className={`p-4 ${className}`} onClick={() => router.back()}><ArrowBackIosNew fontSize='small'/></div>
  )
}

export default BackButton