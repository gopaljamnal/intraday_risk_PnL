import numpy as np

def calculate_mtm(prices):
    mtm = np.array(prices[-1]) - np.array(prices[0])
    mtm = np.round(mtm, 2)
    mtm = mtm.tolist()
    return mtm
