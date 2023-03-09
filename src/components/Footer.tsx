const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-16 bg-gray-100">
        <a
            href="https://github.com/Saul19-L98/todoTasks"
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
        >
            <svg
            className="w-10 h-10 mr-3 transition-transform duration-200 ease-in-out transform hover:translate-y-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.25 3.438 9.672 8.205 11.261.6.111.82-.261.82-.58 0-.29-.01-1.051-.015-2.061-3.338.725-4.042-1.613-4.042-1.613-.546-1.386-1.333-1.756-1.333-1.756-1.088-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.839 2.807 1.306 3.495.998.109-.767.417-1.306.76-1.605-2.665-.306-5.466-1.332-5.466-5.93 0-1.312.465-2.385 1.236-3.225-.135-.307-.536-1.527.104-3.177 0 0 1.005-.324 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.554 3.285-1.23 3.285-1.23.645 1.65.244 2.87.12 3.177.765.84 1.236 1.913 1.236 3.225 0 4.61-2.805 5.62-5.475 5.92.42.36.81 1.096.81 2.215 0 1.6-.015 2.886-.015 3.276 0 .32.21.7.825.58C20.565 21.67 24 17.25 24 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
        </a>
    </footer>
  );
};

export default Footer;