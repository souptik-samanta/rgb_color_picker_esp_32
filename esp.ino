#include <WiFi.h>

#include <NTPClient.h>
#include <WiFiUdp.h>

#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
// Replace with your network credentials
char* ssid = "MCU";
char* password = "00000000";

// Your NTP server settings
char* ntpServer = "pool.ntp.org";
long gmtOffset_sec = 19800; // Adjust to your timezone
int daylightOffset_sec = 19800; // Adjust to your timezone

// Create a WiFiUDP object to send and receive NTP time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, ntpServer, gmtOffset_sec, 600000);

WebServer server(80);

// HTML and JS files from SPIFFS
void serveFile(const char* path, const char* type) {
  File file = SPIFFS.open(path, "r");
  if (!file) {
    server.send(404, "text/plain", "File Not Found");
    return;
  }
  server.streamFile(file, type);
  file.close();
}

void handleRoot() {
  serveFile("/index.html", "text/html");
}

void handleStyles() {
  serveFile("/styles.css", "text/css");
}

void handleScript() {
  serveFile("/script.js", "application/javascript");
}

void handleTime() {
  timeClient.update();
  String formattedTime = timeClient.getFormattedTime();
  server.send(200, "text/plain", formattedTime);
}

void setup() {

  // Serial port for debugging purposes
  Serial.begin(9600);
  SPIFFS.begin() ? Serial.println("mounting SPIFFS.....") : Serial.println("Error while mounting SPIFFS");
  // Set up Access Point
  WiFi.softAP(ssid, password);

  // Print the IP address
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  
  server.on("/", handleRoot);
  server.on("/styles.css", handleStyles);
  server.on("/script.js", handleScript);
  server.on("/time", handleTime);

  server.begin();

  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();

  static unsigned long lastCheck = 0;
  if (millis() - lastCheck >= 600000) { // Check every minute *10
    lastCheck = millis();
    WiFi.disconnect();
    WiFi.begin("CSGO", "sinzoff_");
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
    timeClient.begin();
    timeClient.update();
    
  }
}
