import './Header.css';

function Header(){
    return(
    <>
        <div className="header">
            <h1>WikiPaíses</h1>
            <nav className="navbar">
                <a href="/">Europa</a>
                <a href="/">América</a>
                <a href="/">Ásia</a>
                <a href="/">África</a>
                <a href="/">Oceania</a>
            </nav>

        </div>
    </>
    );
}

export default Header;