import React from "react"
import { useState } from "react"
import AmortizationSchedule from "./AmortizationSchedule.js"
import numberWithCommas from '../helpers/numberWithCommas.js'

const AmortizationForm = props => {

  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [numYears, setNumYears] = useState("")

  const getFinalAmount = () => {
    let finalAmount = 0
    // need to get interest rate per month as a decimal
    let correctedInterestRate = interestRate / 12 * 0.01
    let numMonths = numYears * 12

    if (loanAmount && interestRate && numYears) {
      finalAmount = loanAmount * (correctedInterestRate * (1 + correctedInterestRate)**numMonths) / ((1 + correctedInterestRate)**numMonths - 1)
    }
    return finalAmount
  }

  return (
    <div>
      <title>
        Amortization Calculator
      </title>

      <meta name="Description" content="Generate an amortization schedule" />

      <h1 className="cool-font">Amortization Calculator</h1>
      <form>
        <label className="cool-font">
          Loan amount:&nbsp;$
          <input className="cool-font" type="text" size="19" maxLength="18" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
        </label>
        <br />
        <br />
        <label className="cool-font">
          Interest rate:&nbsp;
          <input className="cool-font" type="text" size="6" maxLength="6" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
          %
        </label>
        <br />
        <br />
        <label className="cool-font">
          Number of years:&nbsp;
          <input className="cool-font" type="text" size="2" maxLength="2" value={numYears} onChange={(e) => setNumYears(e.target.value)} />
        </label>
      </form>
      
      {getFinalAmount() ? 
        <>
        <br />
        <br />

        <div className="cool-font">
          <h2>
            For a <span className="orange">{numYears}</span> year&nbsp;<span className="orange">${numberWithCommas(loanAmount)}</span> 
            &nbsp;loan with a <span className="orange">{interestRate}%</span> interest rate, your fixed monthly payment would be...
          </h2>
        </div>
    
        {/* display and format final amount */}
        <h1 className="cool-big-font"><span className="orange">{`$${numberWithCommas(Number.parseFloat(getFinalAmount()).toFixed(2))}`}</span></h1>

        <br />
        <br />
        <br />

        {
        <AmortizationSchedule loanAmount={loanAmount} interestRate={interestRate} numYears={numYears} monthlyPayment={getFinalAmount()} />
        }
        </>
        : 
        <></>
      }
    </div>
  )
}

export default AmortizationForm