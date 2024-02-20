# Numer0n
import random as rd

### global-var (default)
count_max = 5
num_num = 3
array_ans = []
	
def answer():
	return rd.sample([i for i in range(10)], k=num_num)

def yes_no_input():
	while True:
		choice = input("続けますか? 'yes' or 'no' [y/N] -> ").lower()
		if choice in ['y', 'ye', 'yes']:
			print("\n--------------------\n")
			return True
		elif choice in ['n', 'no']:
			print("終了")
			return False
			
def correct(array):
	global array_ans, num_num
	eat = 0
	bite = 0
	print("Input >> {0}".format(' '.join(map(str,array))))
	for i in range(num_num):
		for j in range(num_num):
			if array[i] == array_ans[j]:
				if i == j:
					eat += 1
					break
				else:
					bite += 1
					break
	print("EAT: {0}\t\tBITE: {1}".format(eat,bite))
	if eat == num_num:
		return True
	else:
		return False

def numeron(count):
	global array_ans, num_num, count_max
	if count <= 0:
		print("Lose...")
		print("答えは {0}".format(' '.join(map(str,array_ans))))
	else:
		print("\n残り  {0}  回".format(count))
		while True:
			val = input("{0} 桁の数字を入力してね << ".format(num_num))
			try:
				array = list(map(int, val))
				if len(array) == num_num:
					if len(set(array)) == len(array):
						break
					else:
						print("...数字被っとるど")
				else:
					print("...{0}桁の数字やで?".format(num_num))
			except ValueError:
				print("...数字を入力せーや💢")
		if correct(array):
			print("Win!!")
		else:
			numeron(count-1)

def init(cnt_max=5, nm_num=3):
	global count_max, num_num, array_ans
	if cnt_max > 0:
		count_max = cnt_max
	if 0 < nm_num < 10:
		num_num = nm_num
	array_ans = answer()

if __name__ == "__main__":
	while 1:
		array_answer = answer()
		init(6, 4)
		numeron(count_max)
		if not yes_no_input():
			break