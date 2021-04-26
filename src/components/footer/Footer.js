import React from "react";
import styled from "styled-components";
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const Container = styled.div`
  height: 80px;
  background-color:#70F0A9;
  display: flex;
  justify-content: top;
  align-items: top;
  position: absolute;
  width: 100%
`;

const Title = styled.h3`
  font-weight: bold;
  color: white;
  text-align: center;
  background-color:#70F0A9;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
class Footer extends React.Component {
   constructor() {
     super();
   }

   contact() {
    this.props.history.push('/contact');
   }

   aboutUs() {
    this.props.history.push('/aboutUs');
   }

   help() {
    this.props.history.push('/help');
   }

    render() {
      return (
        <Container height={this.height}>
            <Button
                width="40%"
                onClick={() => {
                  this.contact();
                }}
                >
                <Title>
                    Contact
                </Title>
            </Button>
            <Button
                width="40%"
                onClick={() => {
                  this.help();
                }}
                >
                <Title>
                    Help
                </Title>
            </Button>
            <Button
                width="40%"
                onClick={() => {
                  this.aboutUs();
                }}
                >
                <Title>
                    About Us
                </Title>
            </Button>
        </Container>
      );
    };
}

/**
 * Don't forget to export your component!
 */
export default Footer;