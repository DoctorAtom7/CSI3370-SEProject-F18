# CSI3370-SEProject-F18
Repository for CSI 3370 project.

## Table of Contents
- Developer Setup
- Development Process
- Vision Statement

## Developer Setup

1. Make sure that you have both the Java Runtime Environment and Java Developer Kit installed. For this project, we'll be using Java 8
2. Wherever you want this project directory to be, run the command `git clone https://github.com/DoctorAtom7/CSI3370-SEProject-F18`
3. Navigate to the project directory in the command line and run:
    * On Windows: `gradlew.bat clean bootRun`
    * On *nix systems: `./gradlew clean bootRun`   
(This project uses [Gradle](https://gradle.org/) - a build tool for Java projects to simplify dependency management and make cross-platform development easier. The above command tells gradle to build and run the project. For a full list of what Gradle can do in our project, run the command: `./gradlew tasks`)  
4. Go to http://localhost:8080 to see the main page of our project. 

## Development Process

* This project will be managed via the [GitHub projects](https://github.com/DoctorAtom7/CSI3370-SEProject-F18/projects/1) tool 
* Development will be divided into sprints where certain user stories are addressed. Several user stories will often be grouped together into a 'Theme' which should be a standalone, demoable feature. Occasionaly, depending on the amount of work to be done for a particular theme - it might be divided up between database/java/frontend specific tasks. This allows team members to be working on the same Theme while still working on different branches. 
* If you want to work on one of the themes, first check to see if a branch already exists for it. If it does, please keep your work on this branch. If a branch does not yet exist, feel free to check one out. If branches could follow the naming convention of `CSI-<issue_number>` that would make things very organized and convenient. 
* As is always best practice working with teams, make sure you pull before pushing so you don't introduce conflicts onto the remote branch. Also try avoiding pushing directly to the master branch. If you feel your branch is ready to be merged into master, make a pull request and wait for one other person to review it

## Project Vision Statment
The internet is often heralded as a bastion of freedom and uninhibited expression, and for good reason. There are countless examples of different internet platforms giving voice and leverage to the formerly voiceless and disadvantaged. However, as these platforms have grown in size and influence, the companies behind them have grown less concerned with anonymity and empowerment and more concerned with profits and regulation of content. Our product is a call back to the older, better days of the world wide web. Users will be anonymous. We will not collect user data for ad display purposes, or sell it to other companies for monetary profit. The forum shall be moderated in order to ensure civility. Authentication barriers shall be invoked to ensure no hacking or bots are masquerading as users. A like system shall be implemented to instill trust between users to ensure they keep using the platform. The platform itself will be censored by community-approved moderators (instead of shareholder-appointed robots). The goal is to once again allow a free, respectful flow of ideas, art, and expression in a safely moderated environment for all users.
