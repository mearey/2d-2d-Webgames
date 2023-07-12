from PIL import Image
import os

for file in os.listdir("fullsprites"):
    os.remove("fullsprites/"+str(file))

x=-1
y=-1
z=-1
for colourFile in os.listdir("colours"):
    x+=1
    for outlineFile in os.listdir("outlines"):
        y+=1
        for patternFile in os.listdir("patterns"):
            z+=1
            new = Image.open("colours/"+colourFile)
            new.paste(Image.open("outlines/"+outlineFile), (0,0), Image.open("outlines/"+outlineFile))
            new.paste(Image.open("patterns/"+patternFile), (0,0), Image.open("patterns/"+patternFile))
            new.save("fullsprites/"+str(x)+str(y)+str(z)+".png", "PNG")
        z=-1
    y=-1