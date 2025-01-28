import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
// import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRespository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    // @InjectRepository(BoardRespository)
    private boardRespository: BoardRespository,
  ) {}

  /**
   * 보드생성
   * @param createBoardDto
   * @returns
   */
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRespository.createBoard(createBoardDto);
  }

  /**
   * id로 찾기
   * @param id
   * @returns
   */
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRespository.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  /**
   * 삭제
   * @param id
   */
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRespository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log(result);
  }

  /**
   * 업데이트
   * @param id
   * @param status
   */
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRespository.save(board);

    return board;
  }

  /**
   * 모두 조회
   * @returns
   */
  async getAllBoards(): Promise<Board[]> {
    return await this.boardRespository.find();
  }

  // private boards: Board[] = [];

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;

  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }

  //   return found;
  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   console.log(board);
  //   console.log(status);
  //   board.status = status;
  //   console.log(board);
  //   return board;
  // }
}
