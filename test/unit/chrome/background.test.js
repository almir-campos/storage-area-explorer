describe("Testing appContext Service", function () {




    var runtime = {};

    var extension = {};


    beforeEach(function () {
        resetChromeApi();
        extension = {
            onConnect: chrome.mocks.createEvent()
        };
        runtime = {
            onMessage: chrome.mocks.createEvent(),
            onMessageExternal: chrome.mocks.createEvent()
        };

    });


    it("Should add proper listeners", function () {
        initializeExtension(runtime, extension);
        expect(runtime.onMessage.listeners.length).toBe(1);
        expect(runtime.onMessageExternal.listeners.length).toBe(1);
        expect(extension.onConnect.listeners.length).toBe(1);
    });

    it("Should correctly listen on port", function () {
        var port = chrome.mocks.createMockPort();
        initializeExtension(runtime, extension);
        extension.onConnect(port, {name: "test"});
        expect(port.onMessage.listeners.length).toBe(1);
        expect(port.onDisconnect.listeners.length).toBe(1);
    });


});