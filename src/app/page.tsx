'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [display, setDisplay] = useState<string>('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false)

  const inputDigit = (digit: number): void => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit))
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = (): void => {
    if (waitingForSecondOperand) {
      setDisplay('0.')
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = (): void => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const performOperation = (nextOperator: string): void => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string): number => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '*':
        return firstOperand * secondOperand
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : firstOperand // Avoid division by zero
      default:
        return secondOperand
    }
  }

  const percentage = (): void => {
    const currentValue = parseFloat(display)
    if (!isNaN(currentValue)) {
      setDisplay(String(currentValue / 100))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-right bg-gray-200 p-2 rounded">
          <div className="text-3xl font-bold" aria-live="polite">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((btn) => (
            <Button
              key={btn}
              onClick={() => isNaN(parseInt(btn)) ? performOperation(btn) : inputDigit(parseInt(btn))}
              className="text-lg font-semibold h-12"
            >
              {btn}
            </Button>
          ))}
          {['4', '5', '6', '*'].map((btn) => (
            <Button
              key={btn}
              onClick={() => isNaN(parseInt(btn)) ? performOperation(btn) : inputDigit(parseInt(btn))}
              className="text-lg font-semibold h-12"
            >
              {btn}
            </Button>
          ))}
          {['1', '2', '3', '-'].map((btn) => (
            <Button
              key={btn}
              onClick={() => isNaN(parseInt(btn)) ? performOperation(btn) : inputDigit(parseInt(btn))}
              className="text-lg font-semibold h-12"
            >
              {btn}
            </Button>
          ))}
          <Button onClick={() => inputDigit(0)} className="text-lg font-semibold h-12">0</Button>
          <Button onClick={inputDecimal} className="text-lg font-semibold h-12">.</Button>
          <Button onClick={percentage} className="text-lg font-semibold h-12">%</Button>
          <Button onClick={() => performOperation('=')} className="text-lg font-semibold h-12">=</Button>
          <Button onClick={() => performOperation('+')} className="text-lg font-semibold h-12">+</Button>
          <Button onClick={clear} className="col-span-full text-lg font-semibold h-12 bg-red-500 hover:bg-red-600 text-white">Clear</Button>
        </div>
      </div>
    </div>
  )
}
