var account;
var accounts;
var carrent = RentCar.deployed();
function set_balance(x)
{
	document.querySelector('#balancemoney').innerHTML=x;

};

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function addmoney(){

	//default deposit to account 1 , static 10000 gems



  var amount = document.getElementById("amountmoney").value;



	carrent.AddMoney(accounts[1], amount).then(function() {

    showamount(accounts[1]);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });




}


function sendCoin(count) {
  var trans = TransferCoin.deployed();

  var amount = parseInt(count);
  var receiver = accounts[1];

  setStatus("Initiating transaction... (please wait)");

  trans.transfer(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!.Money Transferred to Amazon account");
    get_gem(account);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

function showamount(account)
{


	carrent.GetUserdetails.call(account).then(function(value) {
    var balance_element = document.getElementById("balancemoney");
		var balance=value[1];
    balance_element.innerHTML = balance.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });

};
function clicked(x)
{
	var count=String(document.querySelector('#count'+x).innerHTML.trim());
	var d = new Date(); // for now
	var ti=d.getHours();
	carrent.booking.call(accounts[1],ti).then(function(value) {
    //code for removing the car from list;
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
	//call the transaction,account 1 is used for amazon accounts
sendCoin(count);

};
function login()
{

	var mobno=document.getElementById("mno").value;
	var pwd=document.getElementById("password").value;

	//var cr=RentCar.deployed();
	//alert(mobno+"   "+pwd);

	carrent.ValidateLogin.call(mobno).then(function(x){
		alert("value "+x);
		checkcredential(value);

	}).catch(function(e) {
		console.log(e);
		setStatus("Error getting balance; see log.");
	});

	//window.alert(uname+"  "+pwd);

};

function checkcredential(indexofac){
	alert("checkcredential funct");
	var mobno=document.getElementById("mno").value;
	var pwd=document.getElementById("password").value;
	var RentCar=RentCar.deployed();
	alert(mobno+"    "+pwd);
	carrent.GetUserdetails.call(indexofac).then(function(value){
		if(value[4]==mobno && value[5]==pwd){
			window.location="rentacar.html";
		}
		else{
			alert("Invalid Credential!!");
		}
	}).catch(function(e) {
		console.log(e);
		setStatus("Error getting balance; see log.");
	});
};


function register()
{
	var fullname=document.getElementById("fullname").value;
	var hmaddress=document.getElementById("address").value;
	var email=document.getElementById("emailid").value;
	var passwd=document.getElementById("regpwd").value;
	var mobno=document.getElementById("mobno").value;

	//var acno=checkforaccexist();
	//alert(acno);
	  carrent.CreateUser.call(accounts[1],fullname,hmaddress,email,passwd,mobno).then(function(value) {
			//alert(fullname);
			//alert(value);
			alert("Registration Successful!!! Registration ID: "+value+", Now you Will Be Redirected to login page!!")
			//window.location="index.html";

	    //var balance_element = document.getElementById("gem_count");
	    //balance_element.innerHTML = value.valueOf();
	  }).catch(function(e) {
	    console.log(e);
	    setStatus("Error getting balance; see log.");
	  });
		//var cr=RentCar.deployed();
		carrent.GetUserdetails.call(1).then(function(value){
			alert(value);
		}).catch(function(e) {
	    console.log(e);
	    setStatus("Error getting balance; see log.");
	  });



};

function checkforaccexist(){

	var carrent = RentCar.deployed();

	var c=0;
	var retval=0;
	var mno,abort=false;;
	while(!abort){
		//alert("before RentCar "+ c);
		var value=carrent.GetUserdetails(c);

		//alert("before if "+value[4]+" abort value"+abort);
			if(value[4]==9874563214){

				alert("thsi is something you did, inside if "+abort);
				abort=true;
			}

		c++;
		alert(typeof(value["4"]));
		abort=true;
		//alert("inside for loop last "+abort);

	}
	//alert("outside for loop "+abort);

	return retval;
};

function returncar(){
	var d = new Date(); // for now
	var ti=d.getHours();
	var intime;
	carrent.GetUserdetails.call(accounts[1]).then(function(value){
			intime=value[6];

	}).catch(function(e) {
		console.log(e);
		setStatus("Error getting balance; see log.");
	});
	var diff=ti-intime+1;
	carrent.PayRent.call(accounts[1],amount).then(function(value){
		if(value){
			window.alert("You are low on balance please add money");
			window.location="addmoney.html";
		}
		else{
			alert("Car Returned Successfully");
		}
	}).catch(function(e) {
		console.log(e);
		setStatus("Error getting balance; see log.");
	});

}


window.onload = function() {

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    //account = accounts[0];
		//ac2=accounts[1];


		//alert(account);
	//alert(web3.eth.getBalance(account));
    //get_gem(account);
	//alert("you have"+gems+"gems");
  });
}
