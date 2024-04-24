// components/Layout.js

import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <div className="container">
            <div className="sidebar">
                <h2>Navigation Menu</h2>
                <ul>
                    <li>
                        <Link href="/tasks">
                            <a>Tasks</a>
                        </Link>
                    </li>
                    {/* Add more navigation options here if needed */}
                </ul>
            </div>
            <div className="content">
                {children}
            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    height: 100vh;
                }
                .sidebar {
                    width: 200px;
                    background-color: #f0f0f0;
                    padding: 20px;
                }
                .content {
                    flex: 1;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
};

export default Layout;
