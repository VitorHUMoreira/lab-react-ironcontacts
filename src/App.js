import "./App.css";
import contactsJSON from "./contacts.json";
import { useState, useEffect } from "react";

function App() {
  const contacts = contactsJSON;

  const [fiveContacts, setFiveContacts] = useState(contacts.slice(0, 5));

  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function addRandom() {
    let randomContact = contacts[Math.floor(Math.random() * contacts.length)];

    fiveContacts.includes(randomContact)
      ? addRandom()
      : setFiveContacts([...fiveContacts, randomContact]);

    console.log("clicou");
    console.log(fiveContacts.length);
  }

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <div className="btns">
        <button onClick={addRandom}>Add Random Contact</button>
        <button>Sort by popularity</button>
        <button>Sort by name</button>
      </div>
      <hr />
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fiveContacts
              .filter((contact) => {
                return contact.name
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((contact) => {
                return (
                  <tr key={contact.id}>
                    <td>
                      <img
                        src={contact.pictureUrl}
                        alt="profile pic"
                        width={80}
                      />
                    </td>
                    <td>{contact.name}</td>
                    <td>{contact.popularity}</td>
                    <td>{contact.wonOscar && "🏆"}</td>
                    <td>{contact.wonEmmy && "🏆"}</td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
