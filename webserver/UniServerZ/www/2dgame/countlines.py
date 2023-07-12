# import required module
import os
import re
# assign directory
directory = './'

directories = [x[0] for x in os.walk(directory)]
lines = 0
# iterate over files in
# that directory
for dir in directories:
    for filename in os.listdir(dir):
        f = os.path.join(dir, filename)
        # checking if it is a file
        if re.search(".py$",f) or re.search(".html$",f) or re.search(".js$",f) or re.search(".php$",f) or re.search(".sh$",f) or re.search(".css$",f) or re.search(".bat$",f):
            with open(f) as fp:
                lines+=len(fp.readlines())
print(lines)