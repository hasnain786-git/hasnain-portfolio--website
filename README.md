Md Hasnain | Portfolio

A responsive, single-page portfolio for Md Hasnain, Fire Protection Site Engineer (Bangalore, India). It presents his experience, education and the fire safety systems he works on, and includes an interactive fire system demo.

Built with plain HTML, CSS and JavaScript. There is no build step.

Sections
Section	What it shows
Home	Intro with a typing effect, summary, social links, "Hire Me" and "Contact" buttons, profile photo
Experience	Site Supervisor at ZM Digitech Communications (July 2024 to present) and the Best Buy, JPMC and Intuit projects
Education	12th (BSEB, 2022), B.Sc. Physics (2025), software skills and languages
Systems	Sprinkler, fire alarm, PA, NOVEC, VESDA, water leak detection, rodent repellent and troubleshooting
Demo	Interactive floor plan showing how a fire system responds to an event (see below)
Contact	Email, phone, location and a contact form
Interactive fire system demo

Click a device on the floor plan, or use the buttons, to trigger an event:

Smoke detector: the panel raises an alarm, the zone lights up and the sounders operate.
Manual call point: alarm at the exit stair.
Sprinkler flow: the flow switch signals the panel, then the jockey pump and the main pump start.
NOVEC gas release: two detectors confirm, a pre-discharge alarm sounds, then the gas is released.

The steps light up one by one with a fire alarm panel display and indicator lights. Reset panel returns everything to normal. Devices can also be triggered with the keyboard (Tab, then Enter or Space). The sequence is illustrative only; real projects follow their own approved cause-and-effect matrix.

Project structure
hasnain-portfolio-final/
├── index.html    # page markup and all content
├── style.css     # styles (theme colors are variables at the top)
├── script.js     # menu, nav highlight, typing effect, contact form, demo
└── README.md

Image files are not included and must be added to the same folder as index.html:

File	Used for
has.png	Profile photo (home section)
ins.png, tw.png, lin.png, git.png	Instagram, X, LinkedIn and GitHub icons
Running locally

Open index.html in a browser, or serve the folder:

bash
npx serve .

An internet connection is needed for the Poppins font (Google Fonts) and the typing effect library (typed.js 2.1.0 from unpkg). If typed.js does not load, the page shows a fixed "Fire Protection Engineer" title instead.

Customising
Content: edit the text in index.html.
Colors: change the variables in :root in style.css (--main-color, --bg-color, --second-bg-color). The demo's alarm color is --alarm, set in the .demo rule.
Typing roles: edit the strings list in script.js.
Social links: replace the Instagram, X, LinkedIn and GitHub URLs in both the home section and the footer. The X link currently points to the generic https://x.com/home.
Contact form

The form has no backend. On submit, it opens the visitor's email app with the message filled in, addressed to mdhasnin1309@gmail.com. To store messages instead, connect the form to a service such as Formspree or Web3Forms, or to your own server.

Deploying

It is a static site, so any static host works:

Netlify: drag the folder onto the Netlify dashboard.
GitHub Pages: push the folder to a repository and enable Pages.
Vercel: import the repository or run npx vercel.
Accessibility
Semantic headings and landmarks, with labels on form fields and icon links.
Keyboard-operable menu and demo devices, with visible focus outlines.
Animations are turned off for visitors who prefer reduced motion.
Contact
Email: mdhasnin1309@gmail.com
Phone: +91 70918 36042
Location: Bellandur, Bangalore, Karnataka, India
License

Personal portfolio. All content and design belong to Md Hasnain.
