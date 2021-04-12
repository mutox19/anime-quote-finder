import React, { Component } from "react";
import { AnimeServices } from "../_Services/AnimeServices";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./Landing.css";
class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNameSearch: "",
      userTitleSearch: "",
      quotes: [{}],
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangName = this.onChangName.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.getTenRandomQuotes = this.getTenRandomQuotes.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onChangeTitle(e) {
    e.preventDefault();
    this.setState({ userTitleSearch: e.target.value, userNameSearch: "" });

    console.log(this.state.userTitleSearch);
  }
  searchByTitle(title) {
    AnimeServices.getQuoteByTitle(title).then((returnedQuote) => {
      console.log(returnedQuote);
      this.setState({ quotes: [...returnedQuote] });
    });
  }
  onChangName(e) {
    e.preventDefault();
    this.setState({ userNameSearch: e.target.value, userTitleSearch: "" });
    console.log(this.state.userNameSearch);
  }
  searchByName(name) {
    AnimeServices.getQuoteByCharacterName(name).then((returnedQuote) => {
      console.log(returnedQuote);
      this.setState({ quotes: [...returnedQuote] });
    });
  }
  getTenRandomQuotes(e) {
    e.preventDefault();
    AnimeServices.getTenRandomQuotes().then((randomQuotes) => {
      console.log(randomQuotes);
      this.setState({ quotes: [...randomQuotes] });
    });
  }

  getRandomQuote(e) {
    e.preventDefault();
    AnimeServices.getRandomQuote().then((randomQuote) => {
      console.log(randomQuote);
      this.setState({ quotes: [...randomQuote] });
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.userNameSearch != "") {
      this.searchByName(this.state.userNameSearch);
    } else if (this.state.userTitleSearch != "") {
      this.searchByTitle(this.state.userTitleSearch);
    }
  }
  componentDidMount() {
    AnimeServices.getTenRandomQuotes().then((randomQuotes) => {
      console.log(randomQuotes);
      this.setState({ quotes: [...randomQuotes] });
    });
  }
  render() {
    return (
      <div className="wrapper">
        <Container fluid >
          <Row>
            <Col className="header-title-col">
              <h1>Anime Quote Finder</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form
                onSubmit={(e) => {
                  this.onFormSubmit(e);
                }}
              >
                <input
                  type="text"
                  className="search-text"
                  placeholder="Search by Character Name"
                  onChange={(e) => {
                    this.onChangName(e);
                  }}
                />
                <input
                  type="text"
                  className="search-text"
                  placeholder="Search by Anime Title"
                  onChange={(e) => {
                    this.onChangeTitle(e);
                  }}
                />
                <Button className="btn-search" type="submit">Search</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button classame="btn-getrandom"
                onClick={(e) => {
                  this.getRandomQuote(e);
                }}
              >
                Get A Random Quote
              </Button>
              <Button classame="btn-gettenrandom"
                onClick={(e) => {
                  this.getTenRandomQuotes(e);
                }}
              >
                Get 10 Random Quotes
              </Button>
            </Col>
          </Row>

          <Jumbotron className="jumbotron-container">
            <Row>
              {this.state.quotes.map((currentQuote, index) => {
                return (
                  <Col key={index} xs={12} md={3}>
                    
                      <Card style={{ width: "18rem" }} className="card-item">
                        <Card.Header>
                          <h2>Anime Name:</h2>&nbsp;{currentQuote.anime}
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            Character:
                            <br />
                            {currentQuote.character}
                          </Card.Title>
                          <Card.Text>
                            <strong>Quote:</strong>
                            <br />
                            {currentQuote.quote}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    
                  </Col>
                );
              })}
            </Row>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default Landing;

/* <Row>
                  {this.state.resultSets.map((film) => (
                    <Col key={film.id} id="cardItem" xs={12} md={3}>
                      <LatestEvents search={film} />
                    </Col>
                  ))}
                </Row>*/
