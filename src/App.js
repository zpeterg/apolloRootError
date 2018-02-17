import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import { withApollo } from "react-apollo/withApollo";

class App extends Component {
  render() {
    const { data: { loading, people }, client } = this.props;
    // Waiting for the original people to load to show that the cache is loaded
    if (loading) return <div>Loading</div>;

    // Attempt to query out of cache
    const { people: cachePeople } = client.readQuery({
        query: gql`
          query ErrorTemplate2 {
            people {
              id
              name
            }
          }
        `,
    });
    // Attempt to query same type but different query out of cache 
    // --- Delete this and the Person reference below and all will work ---
    const { groupOfPeople: { people: cachePersons } } = client.readQuery({
        query: gql`
          query ErrorTemplate2 {
            groupOfPeople {
              people {
                id
                name
              }
            }
          }
        `,
    });

    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in
            Apollo Client. Edit the source code and watch your browser window
            reload with the changes.
          </p>
          <p>
            The code which renders this component lives in{" "}
            <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and
            ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => <li key={person.id}>{person.name}</li>)}
          </ul>
        )}
        People queried out of cache is:
        <ul>
          {cachePeople.map(person => <li key={person.id}>{person.name}</li>)}
        </ul>
        
        A queried out of cache is:   --- delete this and the Person query above and all will work ---
        <ul>
          {cachePersons.map(person => <li key={person.id}>{person.name}</li>)}
        </ul>

      </main>
    );
  }
}

export default withApollo(graphql(
  gql`
    query ErrorTemplate {
      people {
        id
        name
      }
    }
  `
)(App));
