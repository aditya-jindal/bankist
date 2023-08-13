'use strict';

// Data

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
const account2 = {
owner: 'Jessica Davis',
movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
interestRate: 1.5,
pin: 2222,
};

const account3 = {
owner: 'Steven Thomas Williams',
movements: [200, -200, 340, -300, -20, 50, 400, -460],
interestRate: 0.7,
pin: 3333,
};

const account4 = {
owner: 'Sarah Smith',
movements: [430, 1000, 700, 50, 90],
interestRate: 1,
pin: 4444,
};

const accounts = [account1, account2, account3, account4];


//selection dom elements

const mainEle=document.querySelector('main');
const welcomeEle=document.querySelector('#welcome-msg');
const userEle=document.querySelector('#username');
const PINEle=document.querySelector('#PIN'); 
const loginButt=document.querySelector('#login');
const currBalanceEle=document.querySelector('#current-balance');
const dateEle=document.querySelector('#date-time');
const passbookEle=document.querySelector('#passbook');
const transferOwnerEle=document.querySelector('#transfer-to');
const transferAmtEle=document.querySelector('#transfer-amount');
const transferAmtButt=document.querySelector('#transfer-money button')
const loanAmtEle=document.querySelector('#loan-amount');
const loanButt=document.querySelector('#request-loan button');
const closeUserEle=document.querySelector('#close-user');
const closePINEle=document.querySelector('#close-PIN');
const closeAccButt=document.querySelector('#close-account button');
const statsInEle=document.querySelector('#money-in h2');
const statsOutEle=document.querySelector('#money-out h2');
const statsInterestEle=document.querySelector('#interest h2');
const sortButt=document.querySelector('#sort');
const timerEle=document.querySelector('#timer');

let active; 
let currency='€';//setting one currency for all accounts for simplicity


// computing username for each account

accounts.forEach(function(account){
  account.username='';
  account.owner.split(' ').forEach(function(name){
    account.username+=name[0].toLowerCase();
  });
  console.log(account.username);
});


// function to calculate statistics for given user

const calcStats= function(){
  active.currBalance=0;
  active.in=0;
  active.out=0;
  active.movements.forEach(function(movement){
    active.currBalance+=movement;
    if(movement>0){
      active.in+=movement;
    }
    else{
      active.out+=Math.abs(movement);
    }
  })
  active.interest=active.in*active.interestRate/100;
}


// function to show passbook

const showPassbook=function(){
  passbookEle.innerHTML='';
  active.movements.forEach(function(movement,i){
    const type=movement>0?'deposit':'withdrawal';
    const html=`                <div> 
    <div class="type type-${type}">${i+1} ${type.toUpperCase()}</div>
    <div id="movement-amount">${movement+currency}</div>
</div>
`
  passbookEle.insertAdjacentHTML('afterbegin',html);
  });
}


// function to showUI

const showUI=function(){
  welcomeEle.textContent=`Welcome back, ${active.owner.split(' ')[0]}`;
  calcStats();
  showPassbook();
  currBalanceEle.textContent=active.currBalance+currency;
  statsInEle.textContent=active.in+currency;
  statsOutEle.textContent=active.out+currency;
  statsInterestEle.textContent=active.interest+currency;
  userEle.value='';
  PINEle.value='';
  transferOwnerEle.value='';
  transferAmtEle.value='';
  loanAmtEle.value='';
  closeUserEle.value='';
  closePINEle.value='';
  mainEle.style.opacity='100';
}


// login

loginButt.addEventListener('click',function(){
  const inputUsername=userEle.value;
  const inputPIN=Number(PINEle.value);
  accounts.forEach(function(account){
    if(account.username===inputUsername && account.pin===inputPIN){
      active=account;
      showUI();
    }
  });
});


// logout

const logout=function(){
  welcomeEle.textContent=`Goodbye, ${active.owner.split(' ')[0]}`;
  mainEle.style.opacity='0';
}


//transfer amount

transferAmtButt.addEventListener('click',function(){
  const recipient=transferOwnerEle.value;
  const transferAmt=Number(transferAmtEle.value);
  if(transferAmt<active.currBalance){
    active.movements.push(-1*transferAmt);
    accounts.forEach(function(account){
      if(recipient===account.username){
        account.movements.push(transferAmt);
      }
    });
  }
  showUI();
});


//request loan

loanButt.addEventListener('click',function(){
  const loanAmt=Number(loanAmtEle.value);
  for(const movement of active.movements){
    if(movement>.1*loanAmt){
      active.movements.push(loanAmt);
      break;
    }
  }
  showUI();
});


// close account

closeAccButt.addEventListener('click',function(){
  const inputUsername=closeUserEle.value;
  const inputPIN=Number(closePINEle.value);
  if(inputUsername===active.username && inputPIN===active.pin){
      logout();
      accounts.splice(accounts.indexOf(active),1);
      active=undefined;
      console.log(accounts);
    }
  else{
    showUI();
  }  
});

// more functionality, such as improved UI, account creation, date-time tracking, etc. to be added soon