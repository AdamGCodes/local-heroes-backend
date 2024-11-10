# Local Heroes - Project Overview

## Description

**Local Heroes** is a local community volunteering portal that aims to bring together those who need assistance with day to day or specific tasks and those with the skills and time to help with those tasks. 

Jobs/task could include things such as shopping, cooking, cleaning, DIY or any other task/job a member of the local community would like help with. The focus of the site is on bringing communities together for the benefit of those who need help but also those who provide help. 


[**Local-heroes Deployment link:**](https://local-heroes.netlify.app/)

## Getting Started / Code Installation

This is a web-based app, so no installation is required. 

To view the code for this project, visit the GitHub repository:  
[**Backend GitHub Repository**](https://github.com/Archietheowl/local-heroes-backend)
[**Frontend GitHub Repository**](https://github.com/Archietheowl/local-heroes-frontend)

## Timeframe & Working Team (Solo/Pair/Group)

This project was created in one week with an MVP target and several stretch goals. Some stretch goals were met, while others are planned for future development (see below).

**Team:**
- David
- Iris
- Adam

## Technologies Used

### Planning and Documentation:
- Markdown
- Figma
- Trello
- dbdiagram.io

### Developer Tools:
- VSCode

### Front End:
- React.js
- HTML
- CSS
- JavaScript

### Back End:
- MongoDB
- Express.js
- Node.js
- Mongoose

### Hosting / Cloud Storage:
- Netlify (Deployment)
- Cloudinary (Cloud resource storage)

## Brief

This was a one-week project to create a CRUD application using the MERN stack, applying skills learned in previous weeks of the bootcamp. The deliverables included:
- User stories
- Wireframing
- Planning RESTful routes
- Planning data architecture
- Creating a CRUD site using REACT with an Express backend and MongoDB as a nosql database.

## Planning

The project was planned as a group making use of the colaborative features of Trello and Figma. We diveded up some of the planning tasks to create first drafts and then came back together to discuss and ammend as needed.  We created a user story together then went away to create a RESTful routig table, wireframe and ERD then brought those all together as a group to get into their final first draft form before submitting our plans. 

---

## Build / Code Process

We use colaboration tools in slack to asign specific tasks or sections with regular checkins with oneanother. My primary area of focus on the back end express api was the "Jobs" section. With Iris takig the "user/Auth" section and David the "Helper" section.

As the project moved forwards we became a little more fluid with our areas of focus but continue close communciation and regular check ins. We also met regularly to make pull requests, resolve merge conflicts and keep the main branch up to date and fuctioning as expected. 

We agreed our site styling as a group and I implemented most of the global stying of the site with each of us taking responsability for pages and componants we were working on. 

I created our navigation bar. It was interesting to see the difference in implementing a responsive "hamburger" navigation bar in react and being able to control interactive features like that with Sate. 

```html
const NavBar = ({ user, handleSignOut }) => {

    const [menuOpen, setMenuOpen] = useState(false)
    return (
        
        <div className={styles.navContainer}>
            <img src="/images/header-background.svg" alt="" />
            <NavLink to="/">
                <h1>Local Heroes</h1>
            </NavLink>
            <nav>
                <div 
                className={styles.menu} 
                onClick={() => {
                    setMenuOpen(!menuOpen)
                    console.log("menu clicked!");
                    console.log(menuOpen)
                }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? `${styles.open}` : ""}>
                    
                    { user ? <>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/jobs">See Jobs</NavLink></li>
                        <li><NavLink to="/helpers">See helpers</NavLink></li>
                        <li><NavLink to="" onClick={handleSignOut}>Sign Out</NavLink></li>
                    </>
                        : 
                    <>
                        <li><NavLink to="/signin">Sign In</NavLink></li>
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                    </>}
                </ul>
            </nav>
        </div>
```


## Challenges

Althouh there were a number of smaller technical challenges along the way the group felt that most of our challenges fell in to two main headings and both of these were related to steep learning curves.
The first was the learning cuver with React and working in a very different way to that of previous projects.  We all came to the the incredible posibilities that the framework offers but each found challenges at the start. 

The more significant learning curve was that of colaboration in a group. We spent a lot of time on resolving merge conflicts and as we went on we learned some ways to avoid these delays. The group got on really well and communicated clearly but despite this we all found that our expection is that we would get through 3 times as much work together but we were actually far slower working as a group than any of us had been as individuals in previous tasks. It was eye opening and a great learning experience for future colaborations and work. 


## Wins

Hitting MVP comfortably and managing a couple of our stretch goals for the tast. The biggest win of all was probably in what we learned about colaboration and picking up the pace by working more efficiently as a group as we progressed over the week. 

## Key Learnings / Takeaways

1. **Colaboration:**  
   It's an entire skill set in itself and something that requires practice and further profesional developement. 

2. **Creating full stack applications:**  
   Growing to understand the huge power of creating full stack apps but also the additional challenges and skills required to ensure seemless operation between front end and back end componants. 

## Bugs

Further testing is needed, but for now:
- Upon deployment some of the styling seems to have erros so this will need correcting asap.


## Future Improvements

1. Create a system for help to be offered on a job > that specific offer to be accepted > the job to be marked as done > appreciation to be show for a job well done and a testamonial written. 
2. A badge system to reward and keep track of those who are active in the community.
3. Photo upload on jobs section
4. A feed of local activity to demonstrate and encourage an active local community of helpers and helpees. 

