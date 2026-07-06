CXX = g++
CXXFLAGS = -std=c++17 -Wall

TARGET = SecureBank

SRC = src/main.cpp src/Account.cpp src/Bank.cpp

all:
	$(CXX) $(CXXFLAGS) $(SRC) -o $(TARGET)

run: all
	./$(TARGET)

clean:
	rm -f $(TARGET)