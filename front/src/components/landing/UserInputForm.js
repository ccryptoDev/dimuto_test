import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { writeUserData, retrieveUserData } from '../../utils/utils';

const initialUserData = {
  user: '',
  data: {
    accountNumber: '',
    balance: '',
    transactions: [
      { type: '', amount: '', timestamp: new Date() },
      { type: '', amount: '', timestamp: new Date() }
    ]
  }
};

function UserInputForm() {
  const { userAddress, walletConnected, network } = useSelector(
    (state) => state.user
  );
  const [userInput, setUserInput] = useState(initialUserData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prevInput) => {
      if (name === "user") {
        return {
          ...prevInput,
          user: value
        };
      } else if (name === "accountNumber" || name === "balance") {
        return {
          ...prevInput,
          data: {
            ...prevInput.data,
            [name]: value
          }
        };
      }
    });
  };

  const handleTransactionChange = (event, index) => {
    const { name, value } = event.target;
    setUserInput((prevInput) => {
      const updatedTransactions = [...prevInput.data.transactions];
      updatedTransactions[index][name] = value;
      return { ...prevInput, data: { ...prevInput.data, transactions: updatedTransactions } };
    });
  };

  const handleTimestampChange = (date, index) => {
    setUserInput((prevInput) => {
      const updatedTransactions = [...prevInput.data.transactions];
      updatedTransactions[index].timestamp = date;
      return { ...prevInput, data: { ...prevInput.data, transactions: updatedTransactions } };
    });
  };

  const checkNetwork = () => {
    if (network !== '0x13881') {
      alert('Please switch to Poloygon Mumbai testnet');
      return false;
    }

    return true;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(userInput);

    if (!checkNetwork()) return;

    const tx = await writeUserData(userInput, userAddress);
    // Capture transaction event
    if (tx) {
      alert("Your data has successfully stored on Polygon!");
    } else {
      alert('A transaction is failed');
    }
  };

  const handleRetrieve = async(event) => {
    event.preventDefault();
    if (!checkNetwork()) return;

    setUserInput(initialUserData);
    const res = await retrieveUserData(userAddress);
    if (res) {
      console.log(res);
      setUserInput((prevInput) => {
        return {
          ...prevInput,
          user: res.user,
          data: {
            ...prevInput.data,
            accountNumber: res.data.accountNumber,
            balance: res.data.balance,
            transactions: res.data.transactions.map((transaction) => ({
              ...transaction,
              timestamp: new Date(transaction.timestamp)
            }))
          }
        };
      });
      alert("Your data were successfully retriveved!");
    } else {
      alert("There is no your data or Failed to retrieve encrypted data");
    }
  }

  return (
    <Container>
      <div className="page-title">
        <h2 className="text-center">User Input Form</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>User:</Form.Label>
              <Form.Control
                type="text"
                name="user"
                value={userInput.user}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Account Number:</Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={userInput.data.accountNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Balance:</Form.Label>
              <Form.Control
                type="text"
                name="balance"
                value={userInput.data.balance}
                onChange={handleInputChange}
                required
                pattern="\d+"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="trans-field">
        {userInput.data.transactions.map((transaction, index) => (
          <div key={index}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Type:</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={transaction.type}
                    onChange={(event) => handleTransactionChange(event, index)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
                    type="text"
                    name="amount"
                    value={transaction.amount}
                    onChange={(event) => handleTransactionChange(event, index)}
                    required
                    pattern="\d+"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Timestamp:</Form.Label>
                  <DatePicker
                    wrapperClassName="trans-date"
                    selected={transaction.timestamp}
                    class="trans-time"
                    onChange={(date) => handleTimestampChange(date, index)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    timeCaption="Time"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        </div>
        {/* <Row>
          <Col className="text-right">
            <Button
              type="button"
              onClick={() => setUserInput((prevInput) => ({
                ...prevInput,
                data: {
                  ...prevInput.data,
                  transactions: [
                    ...prevInput.data.transactions,
                    { type: '', amount: '', timestamp: new Date() }
                  ]
                }
              }))}
            >
              Add Transaction
            </Button>
          </Col>
        </Row> */}
        <Row>
          <Col className="text-left">
            <Button 
              type="submit" 
              disabled={!walletConnected}
            >
              Write on Blockchain
            </Button>
          </Col>
          <Col className="text-right">
            <Button 
              type="button" 
              disabled={!walletConnected}
              onClick={handleRetrieve}
            >
              Retrieve from Blockchain
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default UserInputForm;
