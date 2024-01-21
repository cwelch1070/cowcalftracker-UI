from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from random import seed
from random import randint
from time import sleep

class cowcalftracker:
    def __init__(self, username, password, herdName, notes):
        # these lines will help if someone faces issues like
        # chrome closes after execution
        self.opts = webdriver.ChromeOptions()
        self.opts.add_experimental_option("detach", True)
        self.driver  = webdriver.Chrome(options=self.opts)

        # Username and password
        self.username = username
        self.password = password
        self.herdName = herdName
        self.notes = notes
         
        # Opens Instagram login page
        self.driver.get("https://www.cowcalftracker.com")
        sleep(5) 
        
        def createHerd():
            # Automatically enters your username and password 
            self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/form/div[1]/input').send_keys(self.username)
            sleep(1)
            self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/form/div[2]/input').send_keys(self.password)
            
            # Clicks on Log In Button
            self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/form/div[3]/button').click()
            sleep(2)

            # Clicks create herd btn
            self.driver.find_element(By.XPATH, '//*[@id="create-herd-btn"]').click()
            sleep(1)
            
            # Enters a Name
            self.driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div[2]/div/div/div[2]/form/div/input').send_keys(self.herdName)
            
            # Clicks save
            self.driver.find_element(By.XPATH, '//*[@id="save-herd"]').click()
            sleep(1)
            
            # Clicks exit modal
            self.driver.find_element(By.XPATH, '//*[@id="staticBackdrop1"]/div/div/div[1]/button').click()
            sleep(1)

        def createCattle():
            # Clicks options dropdown
            self.driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div/div/button').click()
            sleep(1)

            # Selects cattle option
            self.driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div/div/ul/a').click()
            sleep(1)
    
            # Clicks add cattle btn
            self.driver.find_element(By.XPATH, '/html/body/div/div[3]/div/button').click()
            sleep(1)

            # self.driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/div/div/div/div[2]/form/div[1]/input').send_keys(self.herdName)

            # Seed the random number generator       
            seed(1)

            for i in range(5):
                tagNum = randint(0, 10)

                # Added cattle tag
                self.driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/div/div/div/div[2]/form/div[2]/input').send_keys(tagNum)
                sleep(1) 
                
                # Add cattle note
                self.driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/div/div/div/div[2]/form/div[3]/input').send_keys(self.notes, ' ', i + 1)
                sleep(1)
    
                # Clear text field
                self.driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/div/div/div/div[2]/form/div[2]/input').clear()
                
                # Clear notes text field
                self.driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/div/div/div/div[2]/form/div[3]/input').clear()

                # Click save cattle btn
                self.driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/div/div/div/div[3]/button[2]').click()
                sleep(1)

            # Click exit modal button
            self.driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/div/div/div/div[1]/button').click()
            sleep(1)

        def editCattle():
            # Click options dropdown
            self.driver.find_element(By.XPATH, '/html/body/div/div[5]/div/div/div/div/div/button').click()
            sleep(1)
            
            # Click edit button in dropdown
            self.driver.find_element(By.XPATH, '/html/body/div/div[5]/div/div/div/div/div/ul/button[1]').click()
            sleep(1)

            # Clear text field
            self.driver.find_element(By.XPATH, '/html/body/div[1]/div[6]/div/div/div/div[2]/form/div[2]/input').clear()
                
            # Add cattle note
            self.driver.find_element(By.XPATH, '/html/body/div[1]/div[6]/div/div/div/div[2]/form/div[3]/input').send_keys('This is an edited note.')
            sleep(1)

            # Click save cattle btn
            self.driver.find_element(By.XPATH, '/html/body/div[1]/div[6]/div/div/div/div[3]/button[2]').click()
            sleep(1)

            # Click exit modal button
            self.driver.find_element(By.XPATH, '/html/body/div[1]/div[6]/div/div/div/div[1]/button').click()
            sleep(1)

        def deleteHerd():
            # Click home button
            self.driver.find_element(By.XPATH, '/html/body/div/div[1]/nav/div/a').click()
            sleep(2)

            # Click options dropdown
            self.driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div/div/button').click()
            sleep(1)

            # Click delete Herd
            self.driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div/div/ul/button[2]').click()

        
        # Function to create Herd
        createHerd()

        # Function to create Cattle
        createCattle()

        # Function to edit the Cattle
        editCattle()

        # Function to delete Herd
        deleteHerd()

# Call the class
cowcalftracker('test@test.com', 'test12345', 'North Pasture', 'Test Note')