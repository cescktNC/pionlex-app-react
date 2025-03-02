import PropTypes from 'prop-types';

export default function Footer({ theme }) {
  const logoSrc = theme === 'dark'
    ? 'img/dark-footer-pionlex-logo.svg'
    : 'img/light-footer-pionlex-logo.svg';

  const year = new Date().getFullYear();

  return (
    <footer className='flex justify-evenly items-center text-lg font-bold text-charcoal-950 dark:text-charcoal-50 px-5 py-10'>
      <div className='flex flex-col items-end gap-6'>
        <p className='leading-0'>&copy; {year} - Pion Lex</p>
        <p className='leading-0'>Todos los derechos reservados</p>
      </div>
      <img className='w-30' src={logoSrc} alt='Pionlex Logo' />
    </footer>
  )
}


Footer.propTypes = {
  theme: PropTypes.string.isRequired,
}