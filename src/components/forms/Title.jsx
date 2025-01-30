import PropTypes from 'prop-types';

export default function Title({ 
  children,
  className = ''
}) {
  return (
    <h1 className={`text-dark-gray-600 dark:text-white text-6xl font-semibold text-center uppercase ${className}`}>{ children }</h1>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};