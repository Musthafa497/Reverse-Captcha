'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export default function ReverseCaptcha() {
  const [challenge, setChallenge] = useState('')
  const [answer, setAnswer] = useState('')
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [isVerified, setIsVerified] = useState(null)
  const [attempts, setAttempts] = useState(0)

  const generateChallenge = () => {
    const num1 = Math.floor(Math.random() * 100) + 1
    const num2 = Math.floor(Math.random() * 100) + 1
    const operators = ['+', '-', '*']
    const operator = operators[Math.floor(Math.random() * operators.length)]
    
    setChallenge(`${num1} ${operator} ${num2}`)
    setAnswer(eval(`${num1} ${operator} ${num2}`).toString())
    setTimeLeft(60)
    setIsVerified(null)
    setUserInput('')
  }

  useEffect(() => {
    generateChallenge()
  }, [attempts])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isVerified === null) {
      setIsVerified(false)
      moveToNextCaptcha()
    }
  }, [timeLeft, isVerified])

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleVerify = () => {
    const result = userInput === answer
    setIsVerified(result)
    moveToNextCaptcha()
  }

  const moveToNextCaptcha = () => {
    setTimeout(() => {
      setAttempts(prev => prev + 1)
    }, 2000) // Wait for 2 seconds before moving to the next captcha
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Reverse Captcha</CardTitle>
        <CardDescription>Prove you're a robot!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold text-center">{challenge}</div>
        <div className="text-xl text-center">Time left: {timeLeft}s</div>
        <Input
          type="text"
          placeholder="Enter your answer"
          value={userInput}
          onChange={handleInputChange}
          disabled={isVerified !== null || timeLeft === 0}
          aria-label="Answer input"
        />
        {isVerified !== null && (
          <div 
            className={`text-center font-bold ${isVerified ? 'text-green-500' : 'text-red-500'}`}
            role="alert"
            aria-live="assertive"
          >
            {isVerified ? 'You are a robot!' : 'You are human!'}
            <br />
            Moving to next captcha...
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleVerify} 
          disabled={isVerified !== null || timeLeft === 0} 
          className="w-full"
        >
          Verify
        </Button>
      </CardFooter>
    </Card>
  )
}