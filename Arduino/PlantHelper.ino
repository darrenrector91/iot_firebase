// system_profiler SPUSBDataType

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <ESP8266HTTPClient.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

#define WIFI_SSID "********"
#define WIFI_PASSWORD "*******"
#define FIREBASE_HOST "***-*********-******.firebaseio.com"
#define MOISTURE "soil_moisture"
#define READSOILPIN A0

//Set timing values
const long interval = 300000;
unsigned long previousMillis = 0;

// IFTTT url string with API key
const char *resource = "https://maker.ifttt.com/trigger/soil_moisture/with/key/**************";

// Maker Webhooks IFTTT
const char *server = "maker.ifttt.com";

// Pin assignments
int redPin = 16;
int grnPin = 14;
int PUMP = 5;
int n = 0;

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
    Firebase.set("PUMP_STATUS", 0);
}

void loop()
{
    // get value
    n = Firebase.getInt("PUMP_STATUS");

    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis;

        water();
        if (n == 1)
        {
            Serial.println("");
            Serial.println("PUMP ON");
            digitalWrite(PUMP, HIGH);
            return;
        }
        else
        {
            digitalWrite(PUMP, LOW);
            return;
        }
    }
}

void water()
{
    int soil_moisture = analogRead(READSOILPIN); //connect sensor to A0
    Serial.println("");
    Serial.println("soil moisture ");
    Serial.print(soil_moisture); //print the value to serial port

    if (soil_moisture <= 600)
    {
        digitalWrite(grnPin, LOW);
        digitalWrite(redPin, HIGH);
        digitalWrite(PUMP, HIGH);
        makeIFTTTRequest();
    }
    else
    {
        digitalWrite(grnPin, HIGH);
        digitalWrite(redPin, LOW);
        digitalWrite(PUMP, LOW);
    }

    // Push sensor data to Firebase Realtime Database
    Firebase.pushInt(MOISTURE, soil_moisture);
    if (Firebase.failed())
    {
        Serial.print("pushing failed:");
        Serial.println(Firebase.error());
        return;
    }
}

//void pump_status() {
//  if (n==1) {
//      Serial.println("");
//      Serial.println("PUMP ON");
//      digitalWrite(PUMP,HIGH);
//      return;
//      }
//  else {
//     digitalWrite(PUMP,LOW);
//  return;
//  }
//}

void makeIFTTTRequest()
{
    Serial.print("Connecting to ");
    Serial.print(server);

    WiFiClient client;
    int retries = 5;
    while (!!!client.connect(server, 80) && (retries-- > 0))
    {
        Serial.print(".");
    }
    Serial.println();
    if (!!!client.connected())
    {
        Serial.println("Failed to connect, going back to sleep");
    }

    Serial.print("Request resource: ");
    Serial.println(resource);
    client.print(String("GET ") + resource +
                 " HTTP/1.1\r\n" +
                 "Host: " + server + "\r\n" +
                 "Connection: close\r\n\r\n");

    int timeout = 5 * 10; // 5 seconds
    while (!!!client.available() && (timeout-- > 0))
    {
        delay(100);
    }
    if (!!!client.available())
    {
        Serial.println("No response");
    }
    while (client.available())
    {
        Serial.write(client.read());
    }

    Serial.println("\nclosing connection");
    client.stop();
}