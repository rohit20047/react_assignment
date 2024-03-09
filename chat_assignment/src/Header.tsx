import  { useState } from 'react';
import { FaEllipsisV, FaPlus, FaShareAlt, FaFileAlt } from 'react-icons/fa';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);


  const menuItems = [
    { name: 'Add Member', icon: <FaPlus /> },
    { name: 'Share Number', icon: <FaShareAlt /> },
    { name: 'Report', icon: <FaFileAlt /> },
  ];

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ color: '#ccc', fontSize: '16px', margin: '1rem', order: '1' }}>
          From <span style={{ fontWeight: 'bold', color: '#333' }}>IGI Airport, T3</span>
          <br />
          To <span style={{ fontWeight: 'bold', color: '#333' }}>Sector 28</span>
        </p>
        <FaEllipsisV
          style={{ fontSize: '20px', color: '#333', order: '2', margin: '1.5rem', cursor: 'pointer' }}
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <ul style={{ position: 'absolute', top: 'calc(100% + 5px)', right: 0, listStyle: 'none', padding: 0, margin: 0 , backgroundColor : 'white' }}>
            {menuItems.map((item, index) => (
              <li key={item.name} style={{ padding: '10px', cursor: 'pointer', borderBottom: index !== menuItems.length - 1 ? '1px solid #ccc' : 'none' }}>
                {/* Encircle menu items with a box */}
                <div style={{ borderRadius: '50%', width: '30px', height: '30px', backgroundColor: '#fff', border: '2px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
