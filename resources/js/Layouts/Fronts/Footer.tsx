import type { FC } from 'react';

interface FooterProps {
    darkMode: boolean,
}

const Footer: FC<FooterProps> = ({ darkMode }) => {
    return (
        <footer className={`footer ${darkMode ? 'dark' : ''}`}>
            <div className="footer-content">
                <div className="footer-left">
                    <p>&copy; 2024 AdminPro. Tous droits réservés.</p>
                </div>
                <div className="footer-right">
                    <a href="#" className="footer-link">Aide</a>
                    <a href="#" className="footer-link">Conditions</a>
                    <a href="#" className="footer-link">Confidentialité</a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
