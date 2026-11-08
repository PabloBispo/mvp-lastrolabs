import logoUrl from '../../assets/logo-lastro-labs.svg';

/** Logo horizontal Lastro.Labs (extraída do styleguide). */
export default function Logo({ className = 'h-8 w-auto' }) {
  return <img src={logoUrl} alt="Lastro.Labs" className={className} />;
}
