import { useEffect, useState } from 'react'
import axios from 'axios'
import "../App.css"

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  group: string;
}

interface AllContactsProps {
  onNavigateToCreate: () => void;
}

function AllContacts({ onNavigateToCreate }: AllContactsProps) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string>('All')
  const [groups, setGroups] = useState<string[]>([])
  const [searchString, setSearchString] = useState<string>('')

  useEffect(() => {
    // const apiUrl = "https://api-contact-management-6e3t.onrender.com";
    const apiUrl = import.meta.env.VITE_API_URL
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      const queryParam = searchString ? `?searchString=${encodeURIComponent(searchString)}` : '';
      axios
        .get(`${apiUrl}/all-contacts${queryParam}`, { signal: controller.signal as any })
        .then((res: any) => {
          setContacts(res.data);
          const uniqueGroups:any = [...new Set(res.data.map((contact: Contact) => contact.group).filter(Boolean))];
          setGroups(['All', ...uniqueGroups]);
        })
        .catch((err) => {
          if ((axios as any).isCancel?.(err) || (err as any)?.code === 'ERR_CANCELED' || (err as any)?.name === 'CanceledError') return;
          console.error("Error fetching contacts:", err);
        });
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [searchString]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
    setIsMenuOpen(false);
  };
  

  const filteredContacts = selectedGroup === 'All' 
    ? contacts 
    : contacts.filter(contact => contact.group === selectedGroup);

  return (
    <div className='main-body'>
      {/* Header */}
      <div className="header">
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 className="page-title">Contact Management</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search contacts..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <button className="create-btn" onClick={onNavigateToCreate}>
          + Create Contact
        </button>
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="hamburger-menu">
          <h3>Filter by Group</h3>
          {groups.map((group) => (
            <div
              key={group}
              className={`menu-item ${selectedGroup === group ? 'active' : ''}`}
              onClick={() => handleGroupSelect(group)}
            >
              {group}
            </div>
          ))}
        </div>
      )}

      {/* Contacts Container */}
      <div className="container">
        {filteredContacts.length === 0 ? (
          <p className="no-contacts">No contacts found.</p>
        ) : (
          filteredContacts.map((contact: Contact) => (
            <div key={contact.id} className="card">
              <h3>{contact.first_name} {contact.last_name}</h3>
              <p>
                <strong>Mobile:</strong> {contact.phone}
              </p>
              {contact.group && (
                <p>
                  <strong>Group:</strong> {contact.group}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllContacts
