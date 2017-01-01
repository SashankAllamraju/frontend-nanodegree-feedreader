/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a non-empty URL defined', function(){
            allFeeds.forEach(function(item){
                // URL should not be undefined.
                expect(item.url).toBeDefined();

                // URL value should be a 'string'
                expect(typeof item.url).toBe('string');

                // URL value should not be an empty string.
                expect(item.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a non-empty URL defined', function(){
            allFeeds.forEach(function(item){
                // name should not be undefined.
                expect(item.name).toBeDefined();

                // name value should be a 'string'
                expect(typeof item.name).toBe('string');

                // name value should not be an empty string.
                expect(item.url.name).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe ('The Menu', function(){

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element is hidden by default', function(){

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('class of the <body> toggles to show/hide the menu', function(){
            // emulate menu click ( menu visible ) & check if the body loses 'menu-hidden' class
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            // emulate menu click ( menu hidden ) & check if the body gets back 'menu-hidden' class
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // Before each `it` function, run the loadfeed() function
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        /* This test ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('should have at least 1 entry in feed', function(done) {

            // `.entry` element within the `.feed` element
            var entry = $('.feed').has('.entry');

            // check if entry has non-empty string.
            expect(entry.length).toBeGreaterThan(0);

            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed1,  // feeds after first loadfeed() function executed
            feed2;  // feeds after second loadfeed() function executed

        beforeEach(function(done) {
            // load feed and define feed1 variable
            loadFeed(0, function() {
                feed1 = $('.feed').html();

                // load feed with new data and define the feed2 variable
                loadFeed(1,function() {
                    feed2 = $('.feed').html();
                    done();
                });
            });
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        it('should change upon loading a new feed', function(done) {
            // check whether feed1 & feed2 are different
            expect(feed1).not.toBe(feed2);
            done();
        });
    });

}());
