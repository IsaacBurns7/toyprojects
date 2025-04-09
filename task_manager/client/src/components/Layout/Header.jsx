import React from 'react';

const Header = function(){
    return (<header>
        <div class = "logo">
            <i class = "fas fa-tasks"></i>
            <h1>Taskboard</h1>
        </div>
        <nav>
            <ul>
                <li><a href = "dashboard.html">Dashboard</a></li>
                <li><a href = "boards.html">My Boards</a></li>
                <li><a href = "tasks.html">Tasks</a></li>
            </ul>
        </nav>
        <div class = "user-menu">
            <div class = "user-avatar">filled by JS</div>
            <div class = "dropdown">
                <a href = "profile.html">Profile</a>
                <a href = "settings.html">Settings</a>
                <a href = "#" id = "logout">Logout</a>
            </div>
        </div>
    </header>);
}

export default Header;