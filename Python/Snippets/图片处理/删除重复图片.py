from imagededup.methods import PHash
from shutil import move


def find_and_move_duplicates(folder_path, trash_folder):
    phasher = PHash()
    trashes = phasher.find_duplicates_to_remove(folder_path)
    for trash in trashes:
        move(folder_path + "/" + trash, trash_folder + "/" + trash)


if __name__ == "__main__":
    folder_path = r"C:\Users\yueli\Downloads\龙图"
    trash_folder = r"C:\Users\yueli\Downloads\trash"
    find_and_move_duplicates(folder_path, trash_folder)
