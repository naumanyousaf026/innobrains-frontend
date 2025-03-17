import React from 'react'
import Header from '../Header';
import TechSection from './TechSection';
import ContactForm from '../ContactForm';
import Footer from '../Footer';
import Achievements from './Achievements';
import CompanyValues from './CompanyValues';
import TeamSection from './TeamSection';


 function About() {
  return (
    <div>
<Header />
<TechSection />
<Achievements />
<CompanyValues />
<TeamSection />
<ContactForm />

<Footer />
    </div>
  )
}
export default About;