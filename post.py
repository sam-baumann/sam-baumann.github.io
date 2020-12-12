import json

readf = open("./blogposts.json", "r")

j = json.load(readf)

readf.close()

newpost = {}
#posts need image, heading, text, and date
newpost["image"] = input("Enter the image link: ")
newpost["heading"] = input("Enter the post title: ")
newpost["text"] = input("Enter the text for your post: ")
newpost["Date"] = input("Enter the date for the post: ")

j["content"].append(newpost)

print(j)

writef = open("./blogposts.json", "w")

json.dump(j, writef, indent=4)