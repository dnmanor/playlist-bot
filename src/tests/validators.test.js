const {
    isValidURL,
    isSupportedPlatform,
    getDestinationPlatform,
  } = require("../main/validators");
  
  //mock ups
  const mockAppleURL =
    "https://music.apple.com/gh/playlist/sweet-fat/pl.u-AkAmPpmU25LeGrl";
  const mockSpotifyURL =
    "https://open.spotify.com/playlist/2jCdtyMpGqqsN4s9Woi0t7";
  const mockInvalidURL = "http/gh/playlist/heartbreak/pl.u-6mo4lD4SB7kL6bK";
  
  //tests
  test("Return true for valid URL", () => {
    expect(isValidURL(mockAppleURL)).toBe(true);
  });
  
  test("Return false for invalid URL", () => {
    expect(isValidURL(mockInvalidURL)).toBe(false);
  });
  
  test("Return true when platform is supported", () => {
    expect(isSupportedPlatform(mockSpotifyURL)).toBe(true);
  });
  
  test("Return false if platform is not supported", () => {
    expect(isSupportedPlatform(mockInvalidURL)).toBe(false);
  });
  
  test("Return spotify with apple-music link", () => {
    expect(getDestinationPlatform(mockAppleURL)).toBe("spotify");
  });
  
  test("Return apple-music with spotify link", () => {
    expect(getDestinationPlatform(mockSpotifyURL)).toBe("apple-music");
  });
  
  test("Return platform not supported with invalid URL, includes othe music platfprms", () => {
      expect(()=>{
          getDestinationPlatform(mockInvalidURL)
      }).toThrow("Platform not yet supported.")
    });

