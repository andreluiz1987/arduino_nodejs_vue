int sensorPinA0 = A3;
int sensorPinA1 = A1;

int sensorPinA6 = A6;
int sensorPinA5 = A5;

int ledPin = 13;
int input02 = 2;
int sensorValue = 0;

int statebtn02 = 0;

String dataSerialReceived = "";
String dataAnalog = "";
String strStatebtn02 = "";

unsigned long currentMillis = 0;
unsigned long previousMillis = 0;
unsigned long previousVehicleMillis = 0;
unsigned long INTERVAL = 5000;
unsigned long INTERVAL_VEHICLE = 500;

void setup()
{
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(input02, INPUT_PULLUP);
}

void loop()
{
  currentMillis = millis();

  if (currentMillis - previousMillis > INTERVAL_VEHICLE)
  {
    previousVehicleMillis = currentMillis;
    
    moveVehicle();
    actionLed();
  }

  if (currentMillis - previousMillis > INTERVAL)
  {
    previousMillis = currentMillis;
    readSensor();
  }

  if (Serial.available() > 0)
  {
    String dataSerialReceived = receiveDataSerial();

    if (dataSerialReceived == "TURN_ON")
    {
      digitalWrite(ledPin, HIGH);
    }

    if (dataSerialReceived == "TURN_OFF")
    {
      digitalWrite(ledPin, LOW);
    }
  }
}

void readSensor()
{
  sensorValue = analogRead(sensorPinA0);
  Serial.print("SALA_CODE_123:");
  Serial.print(sensorValue);

  sensorValue = analogRead(sensorPinA1);
  Serial.print(";SALA_CODE_456:");
  Serial.println(sensorValue);
}

void actionLed()
{
  if (digitalRead(input02) == LOW)
  {
    if (statebtn02 == false)
    {
      digitalWrite(ledPin, HIGH);
      statebtn02 = 1;
    }
    else if (statebtn02 == true)
    {
      digitalWrite(ledPin, LOW);
      statebtn02 = 0;
    }
  }
}

void moveVehicle()
{

  int s6 = analogRead(sensorPinA6);
  int s5 = analogRead(sensorPinA5);

  int map6 = map(s6, 0, 1023, 1, 180);
  int map5 = map(s5, 0, 1023, 1, 180);

  if (statebtn02 == 0)
  {
    strStatebtn02 = "";
  }
  else
  {
    strStatebtn02 = "LED_ON_";
  }

  if (map6 > 94 && map6 <= 180)
  {
    Serial.println(strStatebtn02 + "FRENTE");
  }
  else if (map6 > 0 && map6 < 85)
  {
    Serial.println(strStatebtn02 + "TRAS");
  }
  else if (map5 > 90 && map5 <= 180)
  {
    Serial.println(strStatebtn02 + "ESQUERDA");
  }
  else if (map5 > 0 && map5 < 85)
  {
    Serial.println(strStatebtn02 + "DIREITA");
  }
  else
  {
    Serial.println(strStatebtn02 + "PARADO");
  }
}

String receiveDataSerial()
{
  String data = "";
  char character;

  while (Serial.available() > 0)
  {
    character = Serial.read();

    if (character != '\n')
    {
      data.concat(character);
    }
    delay(10);
  }

  return data;
}
