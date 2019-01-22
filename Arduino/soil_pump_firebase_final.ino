// system_profiler SPUSBDataType

/Users/darrenrector/Library/Arduino15/packages/esp8266/hardware/esp8266/2.5.0-beta2/libraries/ESP8266WebServer/src/ESP8266WebServer.h

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <ESP8266HTTPClient.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

#define WIFI_SSID "SKYNET"
#define WIFI_PASSWORD "Rubyred3554"
#define FIREBASE_HOST "ds18b20-3f71f.firebaseio.com"
#define MOISTURE "soil_moisture"
#define READSOILPIN A0
#define MAXDRYNESS 200 // higher number is more dry
#define WATERDELAY 750
#define WATERPOSTDELAY 5000

// IFTTT url string with API key
const char *resource = "https://maker.ifttt.com/trigger/soil_moisture/with/key/ixyxIDv2VzbbEqS4TmTggnv50i0rHoNi1LuIBjkMAAk";

// Maker Webhooks IFTTT
const char *server = "maker.ifttt.com";

int redPin = 5;
int grnPin = 14;
int PUMP = 16;

void setup()
{
    Serial.begin(115200); // open serial port, set the baud rate as 115200 bps
    delay(10);

    pinMode(redPin, OUTPUT);
    pinMode(grnPin, OUTPUT);
    pinMode(READSOILPIN, INPUT);
    pinMode(PUMP, OUTPUT);

    // We start by connecting to a WiFi network
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WIFI_SSID);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    // Let's connect to Firebase
    Firebase.begin(FIREBASE_HOST);
}

void loop()
{
    int soil_moisture = analogRead(READSOILPIN); //connect sensor to A0
    Serial.println("");
    Serial.println("soil moisture ");
    Serial.print(soil_moisture); //print the value to serial port

    if (soil_moisture <= 600)
    {
        digitalWrite(grnPin, LOW);
        digitalWrite(redPin, HIGH);
        digitalWrite(PUMP, LOW);
        delay(10000);
    }

    if (soil_moisture >= 599)
    {
        digitalWrite(grnPin, HIGH);
        digitalWrite(redPin, LOW);
        digitalWrite(PUMP, HIGH);
        delay(10000);
    }

    // Let's push it in firebase Realtime Databasen
    Firebase.pushInt(MOISTURE, soil_moisture);
    if (Firebase.failed())
    {
        Serial.print("pushing failed:");
        Serial.println(Firebase.error());
        return;
    }

    //    delay(100000);
}
