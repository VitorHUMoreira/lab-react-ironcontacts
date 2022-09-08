import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";

function App() {
  const randomStart = Math.floor(Math.random() * (contacts.length - 6));
  const [fiveContacts, setFiveContacts] = useState(
    contacts.slice(randomStart, randomStart + 5)
  );

  function addRandom() {
    if (fiveContacts.length > 51) {
      return;
    } else {
      const randomContact =
        contacts[Math.floor(Math.random() * contacts.length)];

      fiveContacts.includes(randomContact)
        ? addRandom()
        : setFiveContacts([...fiveContacts, randomContact]);
    }
  }

  function sortPopularity() {
    setFiveContacts([
      ...fiveContacts.sort((a, b) => {
        return b.popularity - a.popularity;
      }),
    ]);
  }

  function deleteBtn(id) {
    setFiveContacts(
      fiveContacts.filter((contact) => {
        return contact.id !== id;
      })
    );
  }

  function sortName() {
    setFiveContacts([
      ...fiveContacts.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
  }

  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <h1>Iron Contacts</h1>

      <div className="btns">
        <button onClick={addRandom}>Add Random Contact</button>
        <button onClick={sortPopularity}>Sort by popularity</button>
        <button onClick={sortName}>Sort by name</button>
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
            {!fiveContacts.length && (
              <tr>
                <td className="oops">
                  ⚠️ Oops! There is no more content to show.
                </td>
              </tr>
            )}

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
                        className="img-contact"
                      />
                    </td>
                    <td>{contact.name}</td>
                    <td>{contact.popularity}</td>
                    <td>{contact.wonOscar && "🏆"}</td>
                    <td>{contact.wonEmmy && "🏆"}</td>
                    <td>
                      <button onClick={() => deleteBtn(contact.id)}>
                        Delete
                      </button>
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
