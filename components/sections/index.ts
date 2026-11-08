//This component will be used to register all sections for the future CMS

import About from "./about/About";
import Animals from "./animals/Animals";
import Contacts from "./contacts/Contacts";
import Hero from "./hero/Hero";
import HowItWorks from "./howItWorks/HowItWorks";
import LabelTitleDescription from "./labelTitleDescription/labelTitleDescription";
import Features from "./Features/Features";

export const sectionRegistry = {
  about: About,
  animals: Animals,
  contacts: Contacts,
  hero: Hero,
  howItWorks: HowItWorks,
  labelTitleDescription: LabelTitleDescription,
  features: Features,
} as const;
