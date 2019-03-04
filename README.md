# RemindYou - A Simple Task Board

Welcome to RemindYou, a React/Flask based Reminder Application, utilising a MySQL Database for back-end data storage. I created this project as part of a coding challenge for a job interview process, and it has faciliated me both consolidating and expanding my knowledge of web-based application development. This application was produced over a few days, and I am still new to the field, so improvements are likely to be found everywhere. However, I hope that this repository showcases some of my React, Python Flask, MySQL and Docker skills.

## To Use

1)  Clone the repository
2)  Run `docker-compuse up` on the root directory of the repository
3)  Visit `http://localhost:1234` on your browser of choice
4)  Once the app has loaded, login with the following credentials

    `email`: `ryan@gmail.com`
    `password`: `ilikecats`

5)  The rest is self-explanatory!

## Known Issues

1)  Endpoints are not secured.
    -  The REST API has been written using Flask, and the application utilises Flask-Security for authentication. This library also facilitates securing endpoints easily.
    - However, I was short on time and was unable to figure out how to pass the authentication token from the React front-end to the Python Flask back-end correctly...
    - With more time, I could continue to play around with React to get it working. Alternatively, I believe I may found it easier had I been serving the front-end and back-end elements from the same place, rather than splitting it up as I have done. Lessons learned!

2)  Styling - there isn't any.
    -  UI/UX isn't my biggest strength... I'm definitely a back-end logic guy.
    -  I believe that, for the purposes of coding for this job interview, CSS styling was not massively important, rather the communication between the API and the front-end was far more important, and the application showcases this.

3)  No registration page.
    -  Technically, Flask-Security does allow you to register users (try it: `http://localhost:5000/register`).
    -  One of the remits for the application was a multi-user experience. Again, I ran out of time to properly implement this, though I promise that the user login provided does have an associated ID and, if further users could be created properly, these new users would have separate lists.

## What Did I Learn From This Project?

-  Further consolidated React, Axios, Flask, SQLAlchemy and Docker skills acquired earlier in my career
-  Got a basic grounding in Flask-Security, though I have more to learn
-  Used Docker-Compose for the first time

## Contact

My name is Ryan McDonagh, I am based in the UK in Norwich, and I am a recent graduate from the University of East Anglia with an MSc in Knowledge Discovery and Data Mining. If you have any suggestions or feedback, please get in touch with me through [GitHub](https://github.com/RyanMcDonagh) or [LinkedIn](https://www.linkedin.com/in/ryanjamesmcdonagh/).

