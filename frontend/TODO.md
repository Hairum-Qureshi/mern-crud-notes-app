<!-- prettier-ignore -->
## Production:
[x] - remove react-query-devtools 
[x] - updated backend cookie configuration

## Development:
[ ] - change MongoDB database name via Mongo URI
[x] - need to change the loading spinner color to white for dark mode 
[x] - for the form, need to pick a better dark mode color for the button
[x] - within the home component, align left div using items center
[x] - add hover effects on buttons/links
[x] - change the title of each page
[x] - add a favicon
[x] - check any missing TODOs in other components that were not listed here (remove any missed completed ones too)
[x] - consider creating your own dialogue pop-ups (instead of using alerts)
[x] - there's no guard to prevent users from editing a post and removing the title and or body
[x] - add express-rate-limit middleware to the sticky notes create and edit routes too
[x] - consider adding a 'visited' styling to links that the user has already clicked/visited
[x] - when deleting a note, consider adding a confirmation prompt asking if the user is sure they'd like to delete the note
[x] - consider changing the dark mode background color for the note posting form (while it works, it's different from the rest)
[x] - move any interfaces to the interfaces.ts file (do not forget any props especially)
[x] - whenever you go the post note form, the submit button always loads for a few seconds
[x] - for the contact form, add red asterisks for the required fields
[x] - the edit note form is way too long
[x] - for the sticky notes, make sure there's a height limit
[x] - in the Navbar component, there seems to be an issue with the 'createStickyNote' hook function
[x] - create a frontend ENV file containing the frontend URL and replace it wherever it's used
[x] - double check if the background height will continue to grow as more sticky notes are added
[x] - rename "Create a Big Note" to "Create a Note"
[x] - for some reason you're losing access to the notes you posted previously (not sure if this has to do with editing a post or what)
[x] - add hover effects to modal buttons
**Form Component**
[x] - figure out how to add a max word limit to the textarea
[x] - uncomment the disabled logic for the button
[x] - add a character/word limit to the title
[x] - there's no loading animation when the user hits the edit post button on the form
[x] - if you press the button only entering the note title, it doesn't prompt you to fill in the textarea
[x] - fix issue where if you're on the edit form and click on "Create a Big Note", the form still says 'Edit Post' (and vice versa)
[x] - for some reason when the textarea has nothing in it, it starts at 1/5000 instead of 0/5000
[x] - if you don't edit a post, figure out a way to remove the 'edited at' timestamp if no changes have been made
[x] - make error messages go away after a few seconds 
**StickyNote Component**
[ ] - implement logic for displaying a message to the user about not being able to add a note until they provide their existing 
note a note title and body
[ ] - display an error message to the user when they click the 'add sticky note' button when their current sticky note is empty (they can only add a new sticky note once the recent one isn't empty)
[x] - when you update the sticky note, it doesn't seem to update the date; it seems to still keep the posted date
[x] - for sticky notes, make sure to add a character limit 
[x] - utilize React Query to get the sticky notes
[x] - if you press the sticky note delete button, then the cancel button on the modal, then the add sticky note button, it allows you to add a new sticky note even though you haven't added any content to the last one
[x] - seems to be a glitch where if you add content to the sticky note and delete it right away, it re-appears
[ ] - for the character count, add logic to convert 1,000 to 1k for the number of characters
**StickyNotesDisplay Component** 
[ ] - need to make the error message disappear after a few seconds 
[ ] - fix bug: when you delete a newly created sticky note, the error message that appears is "sticky note not found" 
[ ] - fix bug: 'errorMessage' in useStickyNotes is defined, but when trying to access it in the component, it's empty
[x] - display a message to the user saying there are currently no sticky notes published
[ ] - let's say there's 2 pages of notes and if the user goes to page 3, make sure they get a message displayed telling them none exist
**NotesViewer Component** 
[x] - implement logic to render out any error messages to the user 
[x] - if there are no notes, add a message saying there are no notes 
[x] - consider making the pagination logic a separate component 
[x] - need to improve the dark mode theme - it looks ugly 
[x] - if you go into mobile view and scroll down, the background color behind the paginate buttons is white as the background color doesn't go all the way down (the same happens for the note posting form too) 
[ ] - consider a scenario where there's tons of buttons for each page; implement some type of logic to only list X number of buttons and if there's number of pages beyond that, maybe create a button that has ellipses?
[x] - there seems to be some glitch when you open up the page to the notes viewer. The page flickers a little

## NEXT TIME...
1. Use only the external .gitignore file instead of having 2 separate ones in each folder
2. Make the Form component reusable by passing in props to it depending on what kind of form it is
3. For the view all notes page, figure out how to utilize React-Query's paginate hook