import React from 'react';
import { ReactComponent as ScrumBoard } from 'assets/icons/scrum-board.svg';
import { ReactComponent as Github } from 'assets/icons/github.svg';

import './home.scss';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => (
    <div className="scrumma-home">
        <header className="scrumma-header">
            <nav className="scrumma-nav">
                <h1 className="scrumma-header-title">Scrumma'</h1>
            </nav>
        </header>
        <div className="scrumma-body">
            <div className="scrumma-body-section section-content">
                <p className="scrumma-description">
                    Scrumma' is a simple open source scrum poker
                    <br />
                    application.
                </p>
                <div className="scrumma-auth-button">
                    <Link to="/create">Create a sesssion</Link>
                    <span></span>
                    <Link to="/join">Join to sesssion</Link>
                </div>
            </div>
            <div className="scrumma-body-section section-background">
                <ScrumBoard className="scrumma-illustration" />
            </div>
        </div>
        <footer className="scrumma-footer">
            <a
                href="https://github.com/TheOnlyBeardedBeast/ScrummaSPA"
                title="SPA repo"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Github className="scrumma-github-icon" />
            </a>
            <span>Márk Polák</span>
        </footer>
    </div>
);
