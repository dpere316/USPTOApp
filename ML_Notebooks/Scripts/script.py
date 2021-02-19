import requests
from pprint import pprint
patents_list = []
error_list = []
print('i')
with open('ids.txt') as f:
    for line in f:
        patentno = line[:-1]
        url = f'https://api.patentsview.org/patents/query?q={{"patent_number":"{patentno}"}}&f=["patent_abstract","patent_title"]'
        #print(f'getting {patentno} response')
        response = requests.get(url)
        #pprint(response.json())
        if response.json()['patents'] is not None:
            #print(f'found {patentno}')
            d = response.json()['patents'][0]
            #print(f'created dict')
            my_dict = {"id":patentno,'title':d['patent_title'],'abstract':['patent_abstract']}
            patents_list.append(my_dict)
        else:
            #print(f'error {patentno}')
            error_list.append(patentno)